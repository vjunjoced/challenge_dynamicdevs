import { TopsecretService } from '../services/topsecret';
import * as moduleLocation from '../libs/trilateration';
import * as moduleMessage from '../libs/calculateMessage';
import { NotFoundError } from '../class/errorNotFound';

describe("Test TopsecretService->getTopSecret", () => {
  it("should return data position and message", () => {
    const position = { x: 1, y: 2 };
    const data: any = { satellites: [] }
    const result = { position, message: "Hola" }

    const mockLocation = jest.spyOn(moduleLocation, 'getLocation');
    mockLocation.mockReturnValue(position);

    const mockMessage = jest.spyOn(moduleMessage, 'getMessage');
    mockMessage.mockReturnValue("Hola");

    expect(TopsecretService.getTopSecret(data)).toEqual(result);
    expect(mockLocation).toHaveBeenCalledTimes(1);
    expect(mockLocation).toHaveBeenCalledWith(data.satellites);
    expect(mockMessage).toHaveBeenCalledTimes(1);
    expect(mockMessage).toHaveBeenCalledWith([], [], []);

    mockLocation.mockRestore();
    mockMessage.mockRestore();
  });

  it("should return position not found", () => {
    const data: any = { satellites: [] }

    const mockLocation = jest.spyOn(moduleLocation, 'getLocation');
    mockLocation.mockReturnValue(undefined);

    try {
      TopsecretService.getTopSecret(data)
    } catch (error: any) {
      expect(mockLocation).toHaveBeenCalledTimes(1);
      expect(mockLocation).toHaveBeenCalledWith(data.satellites);
      
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe("No position found");
      expect(error.statusCode).toBe(404);
    }

    mockLocation.mockRestore();
  });

  it("should return message not found", () => {
    const data: any = { satellites: [] }

    const mockLocation = jest.spyOn(moduleLocation, 'getLocation');
    mockLocation.mockReturnValue({ x: 1, y: 1 });

    const mockMessage = jest.spyOn(moduleMessage, 'getMessage');
    mockMessage.mockReturnValue(undefined);

    try {
      TopsecretService.getTopSecret(data)
    } catch (error: any) {
      expect(mockLocation).toHaveBeenCalledTimes(1);
      expect(mockLocation).toHaveBeenCalledWith(data.satellites);

      expect(mockMessage).toHaveBeenCalledTimes(1);
      expect(mockMessage).toHaveBeenCalledWith([], [], []);

      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe("No message found");
      expect(error.statusCode).toBe(404);
    }

    mockLocation.mockRestore();
  });
});