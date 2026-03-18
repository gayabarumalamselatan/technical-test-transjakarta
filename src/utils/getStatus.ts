export function getStatusLabel(status: string): string {
  switch (status) {
    case "IN_TRANSIT_TO":
      return "In Transit";
    case "STOPPED_AT":
      return "Stopped";
    case "INCOMING_AT":
      return "Incoming";
    default:
      return status;
  }
}
