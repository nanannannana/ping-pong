export type prevChat = {
  _id: string;
  user: { _id: string; nickname: string };
  message: string;
  notice: boolean;
}[];

export type members = {
  _id: string;
  user: string;
  nickname: string;
}[];
