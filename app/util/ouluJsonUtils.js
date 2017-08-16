// eslint-disable-next-line import/prefer-default-export
export function cleanJson(data) {
  // const str1 = '":"{"';
  const str2 = '":{"';
  // const str3 = ']}"';
  const str4 = ']}';

  const data2 = JSON.stringify(data).replace(/\\"/g, '"').replace(/":"\{"/g, str2).replace(/\]\}"/g, str4);

  // console.log('Cleaned string: ', data2);
  //
  // console.log('Cleaned json: ', JSON.parse(data2));

  return JSON.parse(data2);
}
