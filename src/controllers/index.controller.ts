import IndexService from '@/services/index.service';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public indexService = new IndexService();
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.indexService.test();
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
