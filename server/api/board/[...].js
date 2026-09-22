/*
 USAGE:
 useFetch('/api/board/columns')                              // GET  (read)
 $fetch('/api/board/columns', { method: 'POST', body })      // CREATE
 $fetch(`/api/board/tasks/${id}`, { method: 'PATCH', body }) // UPDATE
 $fetch(`/api/board/tasks/${id}`, { method: 'DELETE' })      // DELETE
* */

export default defineEventHandler((event) => {
    const target = `http://localhost:3001${event.path.replace(/^\/api\/board/, '')}`
    return proxyRequest(event, target)
})


