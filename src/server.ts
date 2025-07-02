import { app } from './app'

const start = async () => {
  try {
    await app.listen({
      host: '0.0.0.0',
      port: 3333,
    })
    
    console.log('🚀 HTTP Server Running on http://localhost:3333')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()

//# sourceMappingURL=index.js.map