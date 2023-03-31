/*
 * @summary Lumize Swtich Controller config generator
 * Software that generates the esphome yaml configuration
 * for the Lumize Switch Controller, based on parameters
 * given by the user such as number of swithc input boards.
 * @author Sergio Carmine <me@sergiocarmi.net>
 * Created at: 01/05/2022
 */

import readLine from "readline";
import yaml from "js-yaml";
import clipboardy from "clipboardy";

// CONFIGURATION CONSTANTS
const BUS_SDA = 32;
const BUS_SCL = 33;
//////////////////////////

/*
 * Promise wrapper for readLine
 * @param string message The message to ask the user
 * @returns Promise Promise containing the result
 */
const promptUser = (message) => {
  return new Promise((resolve, reject) => {
    try {
      const lineReader = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      lineReader.question(message, (result) => {
        resolve(result);
        lineReader.close();
      });
    } catch (error) {
      reject(error);
    }
  });
};

/*
 * Checks if a string contains only digits
 * @param string string String to test
 * @returns boolean True if string contains only numbers
 */
const containsOnlyDigits = (string) => {
  return /^[0-9]+$/.test(string);
};

/*
 * Asks the user for number of switch input boards
 * @returns Promise input result to be awaited
 */
const askUserForNubmerOfBoards = () => {
  return new Promise(async (resolve) => {
    let input, inputInt;
    let currentMessage = 0;
    const messages = [
      "Number of switch input boards -> ",
      "Input not valid, try again -> ",
      "Number must be between 1 and 8 -> ",
    ];
    while (true) {
      try {
        input = parseInt(await promptUser(messages[currentMessage]));
      } catch (error) {
        currentMessage = 1;
        continue;
      }
      // Check if input is only digits
      if (!containsOnlyDigits(input)) {
        currentMessage = 1;
        continue;
      }

      // Parse input as int
      inputInt = parseInt(input);

      // Check if input is between 1 and 8
      if (inputInt < 1 || inputInt > 8) {
        currentMessage = 2;
        continue;
      }

      break;
    }
    resolve(inputInt);
  });
};

/*
 * Asks the user for controller name
 * @returns Promise input result to be awaited
 */
const askUserForControllerName = () => {
  return new Promise(async (resolve) => {
    const input = await promptUser("Controller name -> ");
    resolve(input);
  });
};

/*
 * Generates config for the i2c bus
 * @returns object i2c config as object
 */
const generateI2CConfig = () => {
  const i2cConfig = { sda: BUS_SDA, scl: BUS_SCL };
  return i2cConfig;
};

/*
 * Generates config for the mcp23017
 * @param number numberOfBoards The number of boards, and tehrefore MCPs
 * @returns object MCP23017 config as object
 */
const generateMCPConfig = (numberOfBoards) => {
  const MCPConfig = [];
  for (let i = 0; i < numberOfBoards; i++) {
    MCPConfig[i] = { id: `mcp23017_${i}`, address: 32 + i };
  }
  return MCPConfig;
};

/*
 * Generates config for every binary sensor entity
 * @param string controller Controller name
 * @param number board Current board id
 * @param number port Current port id on the board
 * @param number input Current input on each port
 * @returns object Binary sensor config as object
 */
const generateSingleBinarySensor = (controller, board, port, input) => {
  const letterIndexes = ["A", "B", "C", "D"];
  const singleBinarySensorConfig = {
    platform: "gpio",
    name: `${controller}-${board + 1}${letterIndexes[port]}-${input + 1}`,
    internal: true,
    pin: {
      mcp23xxx: `mcp23017_${board}`,
      number: port * 4 + input,
      mode: {
        input: true,
        pullup: true,
      },
      inverted: true,
    },
    on_multi_click: [
      {
        timing: ["ON for at most 0.9s", "OFF for at least 0s"],
        then: [
          {
            "homeassistant.event": {
              event: "esphome.lumize_switch",
              data: {
                controller: controller,
                board: (board + 1).toString(),
                port: letterIndexes[port],
                input: (input + 1).toString(),
                event: "SINGLE",
                unique_id: `${controller}-${
			(board + 1).toString()
                }${letterIndexes[port]}-${(input + 1).toString()}-SINGLE`,
              },
            },
          },
        ],
      },
      {
        timing: ["ON for at least 1s"],
        then: [
          {
            "homeassistant.event": {
              event: "esphome.lumize_switch",
              data: {
                controller: controller,
                board: (board + 1).toString(),
                port: letterIndexes[port],
                input: (input + 1).toString(),
                event: "LONG",
                unique_id: `${controller}-${
			(board + 1).toString()
                }${letterIndexes[port]}-${(input + 1).toString()}-LONG`,
              },
            },
          },
        ],
      },
      {
        timing: ["ON for at least 1s", "OFF for at least 0s"],
        then: [
          {
            "homeassistant.event": {
              event: "esphome.lumize_switch",
              data: {
                controller: controller,
                board: (board + 1).toString(),
                port: letterIndexes[port],
                input: (input + 1).toString(),
                event: "LONG_RELEASE",
                unique_id: `${controller}-${
			(board + 1).toString()
                }${letterIndexes[port]}-${(input + 1).toString()}-LONG_RELEASE`,
              },
            },
          },
        ],
      },
    ],
  };
  return singleBinarySensorConfig;
};

/*
 * Generates config for the binary sensors
 * @param number numberOfBoards The number of boards
 * @returns object Binary sensor config as object
 */
const generateBinarySensorConfig = (controllerName, numberOfBoards) => {
  const binarySensorConfig = [];
  for (let board = 0; board < numberOfBoards; board++) {
    for (let port = 0; port < 4; port++) {
      for (let input = 0; input < 4; input++) {
        binarySensorConfig.push(
          generateSingleBinarySensor(controllerName, board, port, input)
        );
      }
    }
  }
  return binarySensorConfig;
};

/*
 * Generates the full config
 * @param number numberOfBoards The number of switch input boards to generate config for
 * @returns object the config in object form
 */
const generateConfig = (controllerName, numberOfBoards) => {
  let config = {
    i2c: generateI2CConfig(),
    mcp23017: generateMCPConfig(numberOfBoards),
    binary_sensor: generateBinarySensorConfig(controllerName, numberOfBoards),
  };
  return config;
};

const main = async () => {
  const numberOfBoards = await askUserForNubmerOfBoards();
  const controllerName = await askUserForControllerName();

  // Generate config
  console.log(
    `Generating config for ${numberOfBoards} Switch Input Boards, controller name: ${controllerName}...`
  );
  const config = generateConfig(controllerName, numberOfBoards);

  // Write generated config to clipboad as yaml
  console.log("Copying config to clipboard...");
  clipboardy.writeSync(yaml.dump(config));

  console.log("Done!");
};

// Start execution
main();
