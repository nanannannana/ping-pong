export interface IChat {
  _id: string;
  user: { _id: string; nickname: string };
  message: string;
  notice: boolean;
}

export interface IDm {
  text: string;
  nickname: string;
}

export interface IRoom {
  roomName: string;
}
