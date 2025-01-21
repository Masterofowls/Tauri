// Проверяем, запущено ли приложение в Tauri
if (window.__TAURI__) {
  import('@tauri-apps/api/dialog').then(({ save }) => {
    import('@tauri-apps/api/fs').then(({ writeBinaryFile }) => {
      document.addEventListener('DOMContentLoaded', () => {
        const downloadButton = document.querySelector('.btn.btn-gradient');

        downloadButton.addEventListener('click', async () => {
          try {
            // Показ диалога выбора пути
            const filePath = await save({
              defaultPath: 'first-demo.zip',
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

            // Скачиваем файл
            const response = await fetch('https://storage.googleapis.com/masterofowlsbucket/Windows.zip');
            if (!response.ok) {
              throw new Error(`Ошибка загрузки: ${response.statusText}`);
            }

            const fileBlob = await response.blob();
            const arrayBuffer = await fileBlob.arrayBuffer();
            const binaryData = new Uint8Array(arrayBuffer);

            // Записываем файл
            await writeBinaryFile(filePath, binaryData);
            alert('Файл успешно загружен!');
          } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка загрузки файла.');
          }
        });
      });
    });
  });
} else {
  console.warn('Tauri API недоступен. Приложение работает в режиме браузера.');
}
