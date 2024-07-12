export interface ITask {
  _id: string;
  name: string;
  comment: string | null;
  deadline: string;
  priority_id: string | null;
  column_id: string;
}
