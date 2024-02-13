# controlled な input\[type="checkbox"] のテストの際に躓いた記録

## 環境
```
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
},
"devDependencies": {
  "@testing-library/jest-dom": "^6.4.2",
  "@testing-library/react": "^14.2.1",
  "@testing-library/user-event": "^14.5.2",
  "@types/jest": "^29.5.12",
  "@types/jsdom": "^21.1.6",
  "@types/react": "^18.2.55",
  "@types/react-dom": "^18.2.19",
  "@typescript-eslint/eslint-plugin": "^6.21.0",
  "@typescript-eslint/parser": "^6.21.0",
  "@vitejs/plugin-react": "^4.2.1",
  "eslint": "^8.56.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.5",
  "jsdom": "^24.0.0",
  "typescript": "^5.2.2",
  "vite": "^5.1.0",
  "vitest": "^1.2.2"
}
```

## 実際にテストしてみてね
```
npm run test
```

## コントロールされているプロパティ(checked)は react testing library の screen.debug をしても値が変わらない
```
// No.1 (first rendering)
chcked is: true
<input
  aria-checked="true"   <= OK
  checked=""            <= OK
  id="undefined-test-value-1-0"
  tabindex="0"
  type="checkbox"
  value="test-value-1"
/>

// No.2 (handled change)
chcked is: false
<input
  aria-checked="false"  <= OK
  checked=""            <= NG
  id="undefined-test-value-1-0"
  tabindex="0"
  type="checkbox"
  value="test-value-1"
/>

```

## 何で判断すればいいのっていう話
aria-checked を盛り込んでなんとか screen.debug で変化を把握することができるようになったものの "checked" が存在し続ける限り紛らわしさが解消されることはない。  
react fiber を html-dom に変換する機能があれば一件落着するのだが。
