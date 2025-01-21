import { save } from '@tauri-apps/api/dialog';
import { writeBinaryFile } from '@tauri-apps/api/fs';

document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.querySelector('.btn.btn-gradient');

  downloadButton.addEventListener('click', async () => {
    try {
      // Показываем диалоговое окно для выбора пути сохранения файла
      const filePath = await save({
        defaultPath: 'Windows.zip',
        filters: [
          {
            name: 'ZIP Files',
            extensions: ['zip']
          }
        ]
      });

      if (!filePath) {
        alert('Выбор пути отменен.');
        return;
      }

      // URL загружаемого файла
      const fileUrl = 'https://storage.googleapis.com/masterofowlsbucket/Windows.zip';

      // Загружаем файл
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
      }

      // Преобразуем данные в бинарный формат
      const fileBlob = await response.blob();
      const arrayBuffer = await fileBlob.arrayBuffer();
      const binaryData = new Uint8Array(arrayBuffer);

      // Сохраняем файл на выбранный путь
      await writeBinaryFile(filePath, binaryData);

      alert('Файл успешно загружен!');
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
      alert('Не удалось загрузить файл. Попробуйте снова.');
    }
  });
});
