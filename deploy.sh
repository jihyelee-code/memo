#!/bin/bash

set -e

echo "📦 1. dev 폴더에서 릴리즈용 빌드 실행"
npm run release

echo "🗑 2. deploy 폴더 비우기"
cd ../deploy
rm -rf ./*

echo "📁 3. 빌드 결과물을 deploy로 복사"
cp -r ../dev/docs/* .

echo "📤 4. Git add/commit/push"
git add .
git commit -m "Deploy docs from dev"
git push origin gh-pages

echo "🎉 배포 완료!"
