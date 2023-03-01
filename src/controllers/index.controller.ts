import IndexService from '@/services/index.service';
import SnowFlakeService from '@/services/snowflake_serviecs';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public snowflakeService = new SnowFlakeService();
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await this.snowflakeService.getSingleAuthorDetails();
      const rows = []
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
