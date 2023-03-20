export async function requestUser( username: string ){
  let url = `https://api.github.com/users/${username}/repos`

  const response = await fetch(url)

  if ( response.ok ) {
      let result = await response.json();
      // result.apiArguments = args

      return result
      
    } else {
      console.log(response);
      throw new Error("HTTP ERROR!!!");
      window.location.hash = "error";
    }
}

export async function logUser () {
  try {
      const data = await requestUser('Bram-ter');
      return data;
  } catch (error) {
      console.log(error)
      window.location.hash = "error"
  }
}