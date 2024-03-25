export function FETCH_CONFIG(method: string, body: any) {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
