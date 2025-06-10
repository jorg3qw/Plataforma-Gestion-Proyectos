import { Request, Response } from "express";
import { EtiquetaService } from "../services/etiqueta.service";
import { RespuestaEstandarizada } from "../utils/respuestaEstandarizada";

export class EtiquetaController {
  private readonly service = new EtiquetaService();

  async crearEtiqueta(req: Request, res: Response) {
    const etiqueta = await this.service.crearEtiqueta(req.body);
    return res
      .status(201)
      .json(
        RespuestaEstandarizada.success(
          "Etiqueta creada correctamente",
          etiqueta,
          201
        )
      );
  }

  async obtenerEtiquetas(_req: Request, res: Response) {
    const lista = await this.service.obtenerEtiquetas();
    return res.json(
      RespuestaEstandarizada.success(
        "Etiquetas obtenidas correctamente",
        lista
      )
    );
  }

  async obtenerEtiquetaPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const etiqueta = await this.service.obtenerEtiquetaPorId(id);
    if (!etiqueta) {
      return res
        .status(404)
        .json(RespuestaEstandarizada.error("Etiqueta no encontrada", 404));
    }
    return res.json(
      RespuestaEstandarizada.success(
        "Etiqueta obtenida correctamente",
        etiqueta
      )
    );
  }

  async actualizarEtiqueta(req: Request, res: Response) {
    const id = Number(req.params.id);
    const etiqueta = await this.service.actualizarEtiqueta(id, req.body);
    return res.json(
      RespuestaEstandarizada.success(
        "Etiqueta actualizada correctamente",
        etiqueta
      )
    );
  }

  async eliminarEtiqueta(req: Request, res: Response) {
    const id = Number(req.params.id);
    const etiqueta = await this.service.eliminarEtiqueta(id);
    return res.json(
      RespuestaEstandarizada.success(
        "Etiqueta eliminada correctamente",
        etiqueta
      )
    );
  }
}
