# TaskFlowCodexTest

Playwright + TypeScript тесты для приложения TaskFlow с Allure отчетами и GitHub Pages.

[![Allure Report](https://github.com/andriiengineer/TaskFlowCodexTest/actions/workflows/allure-pages.yml/badge.svg)](https://github.com/andriiengineer/TaskFlowCodexTest/actions/workflows/allure-pages.yml)

**Allure отчет (GitHub Pages):**
- https://andriiengineer.github.io/TaskFlowCodexTest/

---

## Быстрый старт (локально)

### 1) Установка
```bash
npm install
npx playwright install
```

### 2) Запуск тестов
```bash
npm test
```

### 3) Allure отчет локально
```bash
npm run test:allure
npm run allure:report
npm run allure:open
```

---

## Что именно проверяют тесты
- Kanban board и счетчики колонок
- CRUD задач: создание, редактирование, удаление
- Undo/Redo
- Контекстное меню и перемещение задач
- Multi-select и bulk delete
- Поиск и фильтры
- Drag & Drop
- Хоткеи
- Due date: Today / Tomorrow / Overdue

---

## Где смотреть результаты

### В CI (GitHub Actions)
1. Открой **Actions → Playwright Allure (Manual)**
2. Запусти workflow вручную
3. После завершения открой **Allure report** на Pages:
   https://andriiengineer.github.io/TaskFlowCodexTest/

### Локально
- HTML отчет Playwright: `playwright-report/`
- Allure отчет: `allure-report/`

---

## Полезные команды
```bash
npm run test:ui
npm run test:headed
npm run test:debug
```

---

## Технические детали
- Тесты: `tests/`
- Page Objects: `tests/pages/`
- Компоненты: `tests/components/`
- Утилиты: `tests/utils/`
- Конфиг: `playwright.config.ts`

---

## Примечания
- Локальный сервер поднимается через:
  `python3 -m http.server 8080 --directory app`
- Можно переопределить базовый URL:
  `BASE_URL=http://localhost:8080 npm test`
