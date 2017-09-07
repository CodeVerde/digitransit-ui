
const setCharAt = (str, index, chr) => {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
};

// Maps weather icon based on Oulunliikenne.fi API icon name
export const mapForecaWeatherIcon = (imageName) => {
  let weatherCode = String(imageName.split('.')[0]);

  // Cut away front chars for over 999 codes
  if (weatherCode.length > 3) {
    weatherCode = weatherCode.substr(1, 3);
  }

  // If last digit is 1 - translate it to 2
  if (weatherCode.substr(-1, 1) === '1') {
    weatherCode = setCharAt(weatherCode, 2, '2');
  }

  // If first digit is 1 or 3 - translate it to 2
  if (weatherCode.substr(0, 1) === '1' || weatherCode.substr(0, 1) === '3') {
    weatherCode = setCharAt(weatherCode, 0, '2');
  }

  switch (weatherCode) {
    case '000':
    case '200':
    case '210':
    case '220':
    case '230':
    case '212':
    case '240':
    case '400':
    case '410':
    case '420':
    case '430':
    case '412':
    case '422':
    case '432':
    case '440':
    case '440r':
    case '600':
      return `weather-icon-d${weatherCode}`;
    default:
      return 'weather-icon-d000';
  }
};

export const mapYrWeatherIcon = (iconCode) => {
  const cleanCode = iconCode.replace('D', '');

  switch (cleanCode) {
    case '1':
      return 'weather-icon-d000';
    case '2':
    case '3':
      return 'weather-icon-d200';
    case '4':
      return 'weather-icon-d400';
    case '5':
      return 'weather-icon-d210';
    case '6':
      return 'weather-icon-d240';
    case '7':
    case '8':
      return 'weather-icon-d212';
    case '9':
      return 'weather-icon-d410';
    case '10':
      return 'weather-icon-d420';
    case '11':
      return 'weather-icon-d440';
    case '12':
    case '13':
      return 'weather-icon-d412';
    case '14':
      return 'weather-icon-d440';
    case '15':
      return 'weather-icon-d600';
    case '20':
    case '21':
      return 'weather-icon-d240';
    case '22':
    case '23':
      return 'weather-icon-d440';
    case '24':
    case '25':
    case '26':
    case '27':
    case '28':
    case '29':
      return 'weather-icon-d240';
    case '30':
    case '31':
    case '32':
    case '33':
      return 'weather-icon-d440';
    case '34':
      return 'weather-icon-d440';
    case '40':
      return 'weather-icon-d210';
    case '41':
      return 'weather-icon-d220';
    case '42':
    case '43':
    case '44':
    case '45':
      return 'weather-icon-d212';
    case '46':
      return 'weather-icon-d410';
    case '47':
      return 'weather-icon-d412';
    case '48':
      return 'weather-icon-d432';
    case '49':
      return 'weather-icon-d412';
    case '50':
      return 'weather-icon-d432';
    default:
      return 'weather-icon-d000';
  }
};
