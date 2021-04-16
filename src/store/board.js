import defaultBoard from "@/assets/default-board";
import { saveStatePlugin } from "@/utils/state";
import { uuid } from "@/utils/uuid";

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default {
  plugins: [saveStatePlugin],
  state: {
    board,
  },
  getters: {
    getTask(state) {
      return (taskId) => {
        return state.board.columns.find((column) =>
          column.tasks.find((task) => task.id === taskId)
        );
      };
    },
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: "",
      });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: [],
      });
    },
  },
};
