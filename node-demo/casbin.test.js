import newEnforcerWithTypeorm from './casbin'

test('test newEnforcerWithTypeorm', async () => {
    const options = {
        type: 'sqlite',
        database: 'typeorm.db',
    }
    const e = await newEnforcerWithTypeorm(options)
    await e.addPolicy('admin', '/user/list', 'read')
    await e.addGroupingPolicy('alice', 'admin')
    expect(await e.enforce('alice', '/user/list', 'read')).toBe(true)
})