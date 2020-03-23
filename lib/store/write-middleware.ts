import terms from '../terms';
import {Middleware} from 'redux';
import fs from 'fs';

// the only side effect we perform from middleware
// is to write to the react term instance directly
// to avoid a performance hit
const writeMiddleware: Middleware = () => next => action => {
  if (action.type === 'SESSION_PTY_DATA') {
    const term = terms[action.uid];
    //console.log(action);
    console.log(term);
    //fs.appendFileSync('./' + action.uid + '.log', action.data);
    //console.log(term.term.buffer.getLine(term.term.buffer.cursorY).translateToString());
    if (term) {
      term.term.write(action.data);
      if (term.logging) {
        for (let i = term.lastLogRow + 1; i < term.term.buffer.baseY + term.term.buffer.cursorY; i++) {
          fs.appendFileSync('./' + action.uid + '.log', term.term.buffer.getLine(i).translateToString(true) + '\r\n'); //直到上一行，光标所在行不写入
          //console.log(i + ": " + term.term.buffer.getLine(i).translateToString());
        }
        term.lastLogRow = term.term.buffer.baseY + term.term.buffer.cursorY - 1;
      } else {
        term.lastLogRow = term.term.buffer.baseY + term.term.buffer.cursorY - 1;
      }
    }
  }
  next(action);
};

export default writeMiddleware;
