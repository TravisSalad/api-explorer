const mockApiList: IApiConfig[] = [
  {
    title: 'Delete a post',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'DELETE'
  },
  {
    title: 'Update a post',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'PUT',
    body: [
      {
        name: 'id',
        type: 'number'
      },
      {
        name: 'title',
        type: 'text',
        placeholder: 'title of the post'
      },
      {
        name: 'body',
        type: 'text',
        placeholder: 'the body of the post'
      },
      {
        name: 'userId',
        type: 'number'
      },
    ]
  },
  {
    title: 'Create a post',
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    body: [
      {
        name: 'title',
        type: 'text',
        required: true,
        min: 3,
        max: 10
      },
      {
        name: 'body',
        type: 'text',
        placeholder: 'the body of the post',
        required: true,
      },
      {
        name: 'userId',
        type: 'number',
        required: true,
        pattern: '/\d\d\d-\d\d\d\d/',
      },
    ]
  },
  {
    title: 'Fetch a post',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
  },
]

export default {
  mockApiList
}