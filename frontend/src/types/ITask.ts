export interface ITask {
  _id: string;
  name: string;
  comment: string | null;
  deadline: string;
  priority_id: string;
  column_id: string;
}
