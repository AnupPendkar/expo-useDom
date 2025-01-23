
export function isNullOrUndef(obj: any) {
  return obj === null || obj === undefined;
}

export function getStr(data: any): string {
  return (data as string)?.toString()?.trim();
}

export function getStrLower(data: any): string {
  return getStr(data)?.toLowerCase();
}

export function strCmp(str1: any, str2: any): boolean {
  return getStrLower(str1) === getStrLower(str2);
}

export function cloneDeep<T>(value: T): T {
  // Check if the value is null or not an object (i.e., a primitive)
  if (value === null || typeof value !== "object") {
    return value;
  }

  // If value is an array, create a new array and clone each element
  if (Array.isArray(value)) {
    const arrClone = [] as T & unknown[];
    for (const item of value) {
      arrClone.push(cloneDeep(item));
    }
    return arrClone as T;
  }

  // If value is an object, create a new object and recursively clone each property
  const objClone = {} as T;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      objClone[key] = cloneDeep(value[key]);
    }
  }

  return objClone;
}

export function isPropEmpty(val: any): boolean {
  return (
    isNullOrUndef(val) ||
    (typeof val === "number" && val < 0) ||
    (typeof val === "string" && !val?.trim()?.length) ||
    (Array.isArray(val) && !val?.filter(Boolean)?.length) ||
    (typeof val === "object" && Object.keys(val).length === 0) ||
    (typeof val === "boolean" && val !== true)
  );
}

export function getAttrDispName(attrName: string): string {
  return attrName?.split("_").join(" ");
}

export function removeHttpUrl(url: string) {
  if (isPropEmpty(url)) {
    return url;
  }

  const urlParts = url.split("/media/");
  if (urlParts.length > 1) {
    return "/media/" + urlParts[1];
  }
  return url;
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds

  const hours = String(date.getHours()).padStart(2, "0"); // Local hours
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Local minutes
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Local seconds

  const day = String(date.getDate()).padStart(2, "0"); // Local day
  const month = date.toLocaleString("default", { month: "short" }); // Local month
  const year = date.getFullYear(); // Local year

  return `${hours}:${minutes}:${seconds}  ${day}-${month}-${year}`;
}

function atob(input = "") {
  let str = input.replace(/=+$/, "");
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let output = "";

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded."
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
}
