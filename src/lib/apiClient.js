const DEFAULT_HEADERS = {
  Accept: 'application/json',
}

export async function fetchJson(
  url,
  {
    signal,
    headers,
    ...requestOptions
  } = {},
) {
  const response = await fetch(url, {
    ...requestOptions,
    signal,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
  })

  if (!response.ok) {
    const error = new Error(
      `Request failed with status ${response.status}.`,
    )

    error.status = response.status
    error.statusText = response.statusText

    throw error
  }

  return response.json()
}