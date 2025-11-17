// api/submit.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST allowed' });
    }

    try {
        const { phone, email, age } = req.body;

        // 连接 Supabase
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE
        );

        // 插入数据到数据库
        const { data, error } = await supabase
            .from('submissions')
            .insert([{ phone, email, age }]);

        if (error) {
            console.error('Insert error:', error);
            return res.status(500).json({ error: 'Database insert failed' });
        }

        // 客服列表（可以改成从数据库或 txt 获取）
        const customerService = [
            { name: "客服A", link: "https://t.me/xxxx" },
            { name: "客服B", link: "https://t.me/yyyy" }
        ];

        // 简单轮巡
        const index = Math.floor(Math.random() * customerService.length);

        res.status(200).json({
            message: 'Data saved successfully!',
            customerLink: customerService[index].link
        });

    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server internal error' });
    }
}
