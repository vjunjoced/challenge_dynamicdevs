import { TopsecretController } from './topsecret';
import { TopsecretService } from '../services/topsecret';
import { ValidationError } from '../class/errorValidation';

describe("Test TopsecretController->topSecret", () => {
  it("should return data position and message", () => {
    const body: any = { satellites: [] }
    const result = "Hola";

    TopsecretService.getTopSecret = jest.fn().mockReturnValue(result)
    const spyOnGetTopSecret = jest.spyOn(TopsecretService, "getTopSecret");
    const req: any = { body }
    const res: any = { send: jest.fn() }
    const next = jest.fn()

    TopsecretController.topSecret(req, res, next);
    expect(spyOnGetTopSecret).toHaveBeenCalledTimes(1);
    expect(spyOnGetTopSecret).toHaveBeenCalledWith(body);
    expect(res.send).toHaveBeenCalledWith(result);
    expect(next).toHaveBeenCalledTimes(0);
  });

  it("should return error validation satellites is required", () => {
    const req: any = { body: {} }
    const res: any = { send: jest.fn() }
    const next = jest.fn()

    TopsecretController.topSecret(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new ValidationError("satellites is required"));
  });

  it("should return error validation satellites must be an array", () => {
    const req: any = { body: { satellites: 'hola'} }
    const res: any = { send: jest.fn() }
    const next = jest.fn()

    TopsecretController.topSecret(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new ValidationError("satellites must be an array"));
  });
});