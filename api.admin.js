export async function createCabin(newCabin) {
  try {
    const response = await fetch("http://localhost:3000/api/admin/cabin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCabin),
    });

    const data = await response.json();

    if (!response.ok) {
  
      throw new Error(data.message || "Error al crear la cabaña");
    }

    return data; 
  } catch (error) {

    throw error;
  }
}

