const HttpGetAll = async (data: PaginationProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}contacts?perPage=${data.totalPerPages}&page=${data.page}`,
      {
        method: "GET",
      }
    );
    const jsonResult = await response.json();
    if (jsonResult.currentPage + 1 <= jsonResult.totalPages) {
      const responseMulti = await HttpGetAll({
        totalPerPages: data.totalPerPages,
        page: jsonResult.currentPage + 1,
      });
      jsonResult.results = [...jsonResult.results, ...responseMulti.results];
    }
    return jsonResult;
  } catch (err) {
    // Se añade la bandera de error
    return err;
  }
};

const HttpGet = async (data: PaginationProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}contacts?perPage=${data.totalPerPages}&page=${data.page}`,
      {
        method: "GET",
      }
    );
    // const responseMulti = await HttpGet({totalPerPages: data.totalPerPages, page: data.page+1});
    const jsonResult = await response.json();
    return jsonResult;
  } catch (err) {
    // Se añade la bandera de error
    return err;
  }
};

const HttpPost = async (data: Inputs) => {
  try {
    // Cuerpo del envío
    const bodyFetch = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };
    // Envío al server API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}contacts`,
      bodyFetch
    );
    const jsonResult = await response.json();
    if (jsonResult) {
      const responseCreate: ResponseCreate = {
        status: response.status,
        results: jsonResult,
      };
      return responseCreate;
    }
  } catch (err) {
    // Se añade la bandera de error
    return err;
  }
};

const HttpPut = async (id: string, data: Inputs) => {
  try {
    // Cuerpo del envío
    const bodyFetch = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };
    // Envío al server API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}contacts/${id}`,
      bodyFetch
    );
    const jsonResult = await response.json();
    if (jsonResult) {
      const responseCreate: ResponseCreate = {
        status: response.status,
        results: jsonResult,
      };
      return responseCreate;
    }
  } catch (err) {
    // Se añade la bandera de error
    return err;
  }
};
const HttpDelete = async (id: string | any) => {
  try {
    // Cuerpo del envío
    const bodyFetch = {
      method: "DELETE",
    };
    // Envío al server API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}contacts/${id}`,
      bodyFetch
    );
    const jsonResult = await response.json();
    if (jsonResult) {
      const responseCreate: ResponseCreate = {
        status: response.status,
        results: jsonResult,
      };
      return responseCreate;
    }
  } catch (err) {
    // Se añade la bandera de error
    return err;
  }
};

export { HttpGet, HttpGetAll, HttpPost, HttpDelete, HttpPut };
