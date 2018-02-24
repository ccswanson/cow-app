export default function tagColor(color) {
  if(color === 'Blue'){
    return ({backgroundColor : 'DodgerBlue'});
  }else if (color === 'Yellow') {
    return ({backgroundColor : 'Khaki',
            color: 'black'
            });
  }else if (color === 'Purple') {
    return ({backgroundColor : 'DarkViolet'});
  }else if (color === 'Red') {
    return ({backgroundColor : 'FireBrick'});
  }else if (color === 'Green') {
    return ({backgroundColor : 'DarkOliveGreen'});
  }else if (color === 'Pink') {
    return ({backgroundColor : 'DeepPink'});
  }else if (color === 'Orange') {
    return ({backgroundColor : 'Orange'});
  }else if (color === 'White') {
    return ({backgroundColor : 'white',
            color: 'black'
            });
  }else{
    return ({backgroundColor : 'Black'});
  }
}
