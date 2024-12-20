import {
  VillageState,
  randomRobot,
  routeRobot,
  goalOrientedRobot,
} from "./robot.mjs";

// First exercise

/**
 * Gets the number of steps to finish the task performed by the robot
 * @param {VillageState} state - Current state of the village.
 * @param {Function} robot - Function that determines robot actions (e.g. routeRobot, randomRobot).
 * @param {Array} memory - Robots memory.
 * @returns {number} - Number of steps taken by the robot to complete the task.
 */
function stepsTaken(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

/**
 * Compares efficiency of the two robots and logs the result
 * @param {Function} robot1 - First robot function to test.
 * @param {Array} memory1 - Memory of the first robot.
 * @param {Function} robot2 - Second robot function to test.
 * @param {Array} memory2 - Memory of the second robot.
 */
function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0,
    total2 = 0;
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += stepsTaken(state, robot1, memory1);
    total2 += stepsTaken(state, robot2, memory2);
  }
  console.log(
    `Robot 1 needed ${total1 / 100} average count of steps to finish 100 tasks`
  );
  console.log(
    `Robot 2 needed ${total2 / 100} average count of steps to finish 100 tasks`
  );
}

compareRobots(randomRobot, [], goalOrientedRobot, []);
