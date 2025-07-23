#!/bin/sh
set -e

npm run db:generate
npm run db:migrate
npm run dev