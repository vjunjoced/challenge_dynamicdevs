/**
 * Función que se encarga de determinar el mensaje segun la informacion obtenida por cada uno de los satélites
 * @param sat1 
 * @param sat2 
 * @param sat3 
 * @returns Retorna el mensaje que envía la nave
 */
export function getMessage(sat1: string[], sat2: string[], sat3: string[]): string | undefined {

  if (sat1.length !== sat2.length || sat1.length !== sat3.length) return undefined;
  let result: string[] = [];

  for (let i = 0; i < sat1.length; i++) {
    if (sat1[i] === undefined && sat2[i] === undefined && sat3[i] === undefined) return undefined;
    if (sat1[i] === "" && sat2[i] === "" && sat3[i] === "") return undefined;
    if (sat1[i] !== "" && sat2[i] !== "" && sat1[i] !== sat2[i]) return undefined;
    if (sat2[i] !== "" && sat3[i] !== "" && sat2[i] !== sat3[i]) return undefined;
    if (sat1[i] !== "" && sat3[i] !== "" && sat1[i] !== sat3[i]) return undefined;

    if (sat1[i] !== "") {
      result.push(sat1[i]!);
    } else if (sat2[i] && sat2[i] !== "") {
      result.push(sat2[i]!);
    } else {
      result.push(sat3[i]!);
    }
  }

  return result.join(" ");
}