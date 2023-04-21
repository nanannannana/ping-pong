export interface IChat {
  _id: string;
  user: { _id: string };
  message: string;
  notice: boolean;
}
