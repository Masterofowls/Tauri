document.addEventListener('DOMContentLoaded', () => {
  // Пример интерактивности: запуск игры
  const buttons = document.querySelectorAll('.btn.btn-gradient');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      alert('Запуск лаунчера...');
      // Здесь можно добавить вызов команды Tauri для запуска игры или программы
    });
  });

  // Анимация или интерактивность карточек игр
  const gameCards = document.querySelectorAll('.card-game');
  gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });
});
