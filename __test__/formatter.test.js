const { format_date } = require('../utils/formatter')

test('format_date() return date with xx/xx/xxxx format', () => {
    const date = new Date('2020-03-20 16:12:03');

    expect(format_date(date)).toBe('3/20/2020');
})