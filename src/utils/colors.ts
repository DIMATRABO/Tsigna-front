import { Status } from "types/order";

export const hexColors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FF8000",
  "#8000FF",
  "#00FF80",
  "#FF0080",
  "#80FF00",
  "#0080FF",
  "#FFC0C0",
  "#C0FFC0",
  "#C0C0FF",
  "#FFFF80",
  "#FF80FF",
  "#80FFFF",
  "#FF8080",
  "#80FF80",
  "#8080FF",
  "#FFFFC0",
  "#C0FFFF",
  "#FFC080",
  "#C080FF",
  "#80FFC0",
  "#C080FF",
  "#C0FF80",
  "#80C0FF",
  "#FFC0FF",
];

// .open { background-color:#808080}
//     .closed { background-color: #00FF00}
//     .canceled { background-color: #FF0000}
//     .expired { background-color: #FFA500; }
//     .rejected { background-color: #690769}
//     .failed { background-color: #c10a0a}

export const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.Open:
      return "blue";
    case Status.Closed:
      return "green";
    case Status.Canceled:
      return "pink";
    case Status.Expired:
      return "orange";
    case Status.Rejected:
      return "red";
    case Status.Failed:
      return "red";
    default:
      return "blue";
  }
};
