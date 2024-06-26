import moment from 'moment';
const FORMAT = 'MMM DD, YYYY, HH:mm a';
const statusClasses = ['newst', 'asgnst', 'inprgst', 'dnst', 'cnclst', 'onhldst', 'queuest'];
export const TASK_STATUSES = ['NEW', 'ASSIGNED', 'IN_PROGRESS', 'DONE', 'CANCELED', 'ON_HOLD', 'QUEUED'];

export function formatDate(date, format) {
    let parsedDate = null;
    if(date) {
      parsedDate = new Date(date * 1000);
    } 
    let momentDate = parsedDate ? moment(parsedDate) : null;
    return momentDate ? momentDate.isValid() ? momentDate.format(format ? format : FORMAT) : '' : '';
}
export function formatStatus(status) {
    return status ? status : '';
}
export function getStatusClass(status) {
    if(status){
      const statusIdx = TASK_STATUSES.indexOf(status);
      if(statusIdx > -1){
        return statusClasses[statusIdx];
      }
    }
    return '';
}
export function getActivePage(val1, val2) {
  if(val1 !== null && val1 !== undefined) {
    return val1
  } else if(val2 !== null && val2 !== undefined) {
    return val2
  } else {
    return 0;
  }
}