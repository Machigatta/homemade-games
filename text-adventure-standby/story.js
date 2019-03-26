let path_main = {
    "start": {
        label: "Hallway",
        line: [
            "Waking up",
            "Looking around",
            "There is a door to the left",
            "There is a window to the right",
            "There is a screwdriver at the floor"
        ],
        left: {
            label: "Door",
            target: "start_door"
        },
        right: {
            label: "Window",
            target: "start_window"
        },
        execute: {
            label: "Screwdriver",
            target: "start_screwdriver"
        }
    },
    "start_door": {
        label: "Old rusty Door",
        line: [
            "The Door is rusty",
            "Nothing to see here"
        ],
        left: null,
        right: {
            label: "Back",
            target: "start"
        },
        execute: null
    },
    "start_window": {
        label: "Old rusty Window",
        line: [
            "This Window is rusty",
            "Nothing to see here"
        ],
        left: {
            label: "Back",
            target: "start"
        },
        right: null,
        execute: null
    },
    "start_screwdriver": {
        label: "Old rusty Screwdriver",
        line: [
            "This Screwdriver is rusty",
            "Nothing to see here"
        ],
        left: {
            label: "Back",
            target: "start"
        },
        right: null,
        execute: null
    }
}