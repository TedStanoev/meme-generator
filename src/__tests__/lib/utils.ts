import { downloadCanvas } from '@/lib/utils';
import '@testing-library/jest-dom';

import html2canvas from 'html2canvas';

jest.mock('html2canvas');

const mockHtml2Canvas = html2canvas as jest.MockedFn<() => Promise<HTMLCanvasElement>>;
 
describe('Download file', () => {
  it('should create a canvas from the element and trigger download', async () => {
    // Arrange
    const mockElement = document.createElement('div');
    const mockCanvas = {
      toDataURL: jest.fn(() => 'data:image/png;base64,mockData')
    };
    mockHtml2Canvas.mockResolvedValue(mockCanvas as unknown as HTMLCanvasElement);
  
    const mockLink = {
      href: '',
      download: '',
      click: jest.fn() // Spy on the click method
    };
    jest.spyOn(document, 'createElement').mockImplementation(() => mockLink as unknown as HTMLAnchorElement);
  
    // Act
    await downloadCanvas(mockElement);
  
    // Assert
    expect(html2canvas).toHaveBeenCalledWith(mockElement);
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
    expect(mockLink.href).toBe('data:image/png;base64,mockData');
    expect(mockLink.download).toBe('meme.png');
    expect(mockLink.click).toHaveBeenCalledTimes(1);
  });
})