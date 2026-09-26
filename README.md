# UMC App 서비스 기획 인수인계

UMC PRODUCT 구성원이 UMC App의 기획 배경과 기능, 운영 경험을 이해할 수 있도록 만든 인수인계 사이트입니다. 제옹과 리버가 팀을 꾸리며 나눈 고민부터 앱 배포 이후 겪은 문제와 개선 과정까지 담았습니다. 첫 장부터 목차 순서대로 읽는 것을 권장합니다.

**사이트:** [UMC App 인수인계 문서](https://umc-product.github.io/umc-app-pm-handoff/)

## 로컬에서 실행하기

Node.js 22와 npm이 필요합니다.

```bash
npm ci
npm run dev
```

출력된 로컬 주소로 개발 서버에 접속할 수 있습니다. 로컬 개발 화면에는 배포 사이트의 비밀번호 입력 화면이 적용되지 않습니다.

## 빌드와 확인

배포용 빌드는 `HANDOFF_PASSWORD` 환경 변수를 사용해 문서와 화면 캡처를 암호화한 뒤 `dist/`에 저장합니다. 비밀번호가 없으면 빌드가 중단됩니다.

```bash
HANDOFF_PASSWORD='비밀번호' npm run build
HANDOFF_PASSWORD='비밀번호' npm run test:access
node scripts/check-performance.mjs
```

`test:access`는 올바른 비밀번호와 잘못된 비밀번호, 변조된 파일, 캡처 포함 여부를 확인합니다. `check-performance.mjs`는 문서에 적힌 성과 지표를 검사합니다. `dist/`는 빌드 결과이므로 직접 수정하지 않습니다.

## 배포

`main`에 변경이 반영되면 [GitHub Actions](.github/workflows/pages.yml)가 `npm ci`, 빌드, 접근 검사, 지표 검사를 실행하고 `dist/`를 GitHub Pages에 배포합니다. 저장소의 GitHub Actions Secret `HANDOFF_PASSWORD`가 필요합니다.

비밀번호 입력 화면은 배포된 문서와 캡처 파일에 대한 접근을 제한합니다. 이 저장소는 공개되어 있으므로 소스 코드와 `app-capture/`의 원본 파일은 별도로 열람할 수 있습니다. 공개하면 안 되는 자료는 저장소에 추가하지 마세요.

## 주요 경로

| 경로 | 내용 |
| --- | --- |
| `src/modules/` | 01~10장 본문과 목차 데이터 |
| `src/components/` | 장별 화면, 도표, 시각 자료 |
| `app-capture/ios/`, `app-capture/android/` | 기능 설명에 연결된 화면 캡처 |
| `access/` | 배포 사이트의 비밀번호 입력 화면 |
| `scripts/` | 암호화 빌드와 접근·지표 검사 |
| `dist/` | GitHub Pages에 게시되는 빌드 결과 |

## 라이선스

[MIT License](LICENSE)
