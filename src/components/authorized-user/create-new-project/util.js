export const isDigit = (c) => {
  if (
    c == 0 ||
    c == 1 ||
    c == 2 ||
    c == 3 ||
    c == 4 ||
    c == 5 ||
    c == 6 ||
    c == 7 ||
    c == 8 ||
    c == 9
  ) {
    return true;
  } else {
    return false;
  }
};

export const setCoordinates = (value) => {
  value = value.replace(/\s/g, "");
  if (
    value[value.length - 1] == ")" &&
    value[0] == "(" &&
    (value.match(/,/g) || []).length == 1
  ) {
    let tmp = value.slice(1, -1);
    let lat = tmp.split(",")[0];
    let lng = tmp.split(",")[1];

    let arr = [];
    arr.push(lat);
    arr.push(lng);

    for (let i = 0; i <= 1; i++) {
      if (!arr[i].length > 0) {
        return -1;
      }

      let dotCount = 0;
      let firstNonSign = 0;

      if (arr[i][0] == "-") {
        firstNonSign++;
      }

      if (
        isDigit(arr[i][firstNonSign]) == false ||
        isDigit(arr[i][arr[i].length - 1]) == false
      ) {
        return -1;
      }

      for (let j = firstNonSign + 1; j < arr[i].length - 1; j++) {
        if (arr[i][j] == ".") {
          dotCount++;

          if (dotCount == 2) {
            return -1;
          }
        } else if (isDigit(arr[i][j]) == false) {
          return -1;
        }
      }
    }

    return { lat: lat, lng: lng };
  } else {
    return -1;
  }
};
