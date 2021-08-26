export default function countDown(num, actionContinue, actionStop) {
  let nextNum = --num;
  if (nextNum < 0) {
    actionStop();
  } else {
    let id = setTimeout(() => {
      countDown(nextNum, actionContinue, actionStop);
    }, 1000);
    actionContinue(nextNum, id);
  }
}
