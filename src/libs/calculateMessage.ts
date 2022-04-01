/**
 * Funcion que se encarga de determinar el mensaje segun la informacion obtenida por cada uno de los satélites
 * @param kenobi 
 * @param skywalker 
 * @param sato 
 * @returns Retorna el mensaje que envía la nave
 */
export function getMessage(kenobi: string[], skywalker: string[], sato: string[]): string | undefined {

  if (kenobi.length !== skywalker.length || kenobi.length !== sato.length) return undefined;
  let result: string[] = [];

  for (let i = 0; i < kenobi.length; i++) {
    if (kenobi[i] === undefined && skywalker[i] === undefined && sato[i] === undefined) return undefined;
    if (kenobi[i] === "" && skywalker[i] === "" && sato[i] === "") return undefined;
    if (kenobi[i] !== "" && skywalker[i] !== "" && kenobi[i] !== skywalker[i]) return undefined;
    if (skywalker[i] !== "" && sato[i] !== "" && skywalker[i] !== sato[i]) return undefined;
    if (kenobi[i] !== "" && sato[i] !== "" && kenobi[i] !== sato[i]) return undefined;

    if (kenobi[i] !== "") {
      result.push(kenobi[i]!);
    } else if (skywalker[i] && skywalker[i] !== "") {
      result.push(skywalker[i]!);
    } else {
      result.push(sato[i]!);
    }
  }

  return result.join(" ");
}