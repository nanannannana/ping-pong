const initstate = {
  nickname: "",
};

const ADDNICKNAME = "user/ADDNICKNAME";

export const addNickname = (nickname: string) => ({
  type: ADDNICKNAME,
  nickname,
});

export default function user(
  state = initstate,
  action: { type: string; nickname: string }
) {
  switch (action.type) {
    case ADDNICKNAME:
      return {
        ...state,
        nickname: action.nickname,
      };
    default:
      return state;
  }
}
