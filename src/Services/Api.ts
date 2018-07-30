import axios, { AxiosResponse } from 'axios';

export async function sendRequest(req: IReqObject): Promise<AxiosResponse<any>> {
  if (!req.data) delete req.data;
  try {
    const res: AxiosResponse<any> = await axios({ ...req });
    return res && res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}