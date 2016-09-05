export const intToByteArray = function (int) {
  let byteArray = [0, 0, 0, 0];
  for (let index = 0; index < byteArray.length; index++) {
    let byte = int & 0xff;
    byteArray[index] = byte;
    int = (int - byte) / 256;
  }
  return byteArray;
};
