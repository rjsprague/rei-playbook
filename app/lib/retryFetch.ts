// /lib/retryFetch.ts
export async function retryFetch(url: string, options: RequestInit, retries: number, delay: number): Promise<Response> {

    // console.log(url, options, retries, delay);

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch('http://localhost:3000'+url, options);
        console.log(response);
        if (response.ok) {
          return response;
        }
        console.error(`Attempt ${i + 1} failed: ${response.statusText}`);
      } catch (error) {
        console.error(`Attempt ${i + 1} encountered an error: ${error}`);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  
    throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
  }
  