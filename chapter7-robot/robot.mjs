const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

/**
 * Builds a graph as an adjacency list from an array of edge strings.
 * @param {string[]} edges - Array of strings representing connections (e.g., "A-B").
 * @returns {Object} - Adjacency list representing the graph.
 *
 * @example
 * const roads = ["A-B", "B-C", "A-C"];
 * const graph = buildGraph(roads);
 * // Output: { A: ["B", "C"], B: ["A", "C"], C: ["B", "A"] }
 */
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (from in graph) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

/**
 * Represents the state of the village.
 * @param {string} place - Robot's current location.
 * @param {Array<{place: string, address: string}>} parcels - Array of parcel objects with `place` and `address`.
 */
export class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  /**
   * Moves the robot to a new destination if possible.
   * @param {string} destination - Target location.
   * @returns {VillageState} - New state after moving.
   */
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

/**
 * Simulates the robot delivering parcels.
 * @param {VillageState} state - Initial state of the village.
 * @param {Function} robot - Function that determines robot actions.
 * @param {Array} memory - Robot's memory (optional).
 */
function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

/**
 * Picks a random element from an array.
 * @param {Array} array- The array to pick from.
 * @returns {*} - A random element from the array.
 */
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

/**
 * Determines a random direction for the robot to move.
 * @param {VillageState} state - The current state of the village.
 * @returns {{direction: string}} An object with random direction.
 */
export function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

/**
 * Generates a random village state with parcels placed at random locations.
 * @param {number} [parcelCount=5] - Number of parcels to generate.
 * @returns {VillageState} - A new village state with place "Post Office" and random parcels list.
 */
VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

// Example with a random robot:
// runRobot(VillageState.random(), randomRobot);

// Example of a smarter robot using mail route:

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

/**
 * Determines robot direction based on the given mail route
 * @param {VillageState} state - The current state of the village
 * @param {string[]} memory - Robots memory
 * @returns {{direction: string, memory: string[]}} - An Object with the next direction and the updated memory.
 */
export function routeRobot(state, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

// runRobot(VillageState.random(), routeRobot, []);

// Robot finding route based on Breadth-First Search (BFS) algorithm

/**
 * Function to find shortest way from one location to another  using Breadth-First Search (BFS).
 * @param {object} graph - Adjacency list of connected locations e.g. { A: ["B", "C"], B: ["A", "C"], C: ["B", "A"] }
 * @param {string} from - The starting location
 * @param {string} to - The target location
 * @returns {string[]} - An Array of locations from start to finish e.g. ["Bob's House", "Town Hall", "Marketplace"]
 */
function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place === to) return route.concat(place);
      if (!work.some((w) => w.at === place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}
// TODO: Create docstring for the function
export function goalOrientedRobot({ place, parcels }, route) {
  if (route.length === 0) {
    let parcel = parcels[0];
    if (parcel.place !== place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// runRobot(VillageState.random(), goalOrientedRobot, []);
