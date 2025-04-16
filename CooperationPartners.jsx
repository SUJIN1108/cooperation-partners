
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const partners = [
  {
    name: '中国银行 Bank of China',
    category: '金融服务',
    description:
      '中国银行是中国持续经营时间最久的银行，成立于1912年，提供综合金融服务，在全球60多个国家设有分支机构。',
    country: '中国',
    isResident: false,
  },
  {
    name: '华侨银行 OCBC Bank',
    category: '金融服务',
    description:
      '新加坡最悠久的本土银行，覆盖东盟和大中华区，并在中国设有15家分支机构。',
    country: '新加坡',
    isResident: false,
  },
  {
    name: '新加坡创士锋 Transfong Ventures',
    category: '市场服务',
    description:
      '中新跨国发展合作平台，支持100多家中新科技企业双向发展。',
    country: '新加坡',
    isResident: false,
  },
  {
    name: '厦门建发集团 Xiamen C&D Group',
    category: '商务服务',
    description:
      '厦门市属国有企业，2024年《财富》世界500强第85位，涵盖供应链运营、医疗健康等业务。',
    country: '中国',
    isResident: false,
  },
];

export default function CooperationPartners() {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('全部');
  const [residentFilter, setResidentFilter] = useState('全部');

  const filteredPartners = partners.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.includes(search);
    const matchCountry = selectedCountry === '全部' || p.country === selectedCountry;
    const matchResident =
      residentFilter === '全部' ||
      (residentFilter === '是' && p.isResident) ||
      (residentFilter === '否' && !p.isResident);
    return matchSearch && matchCountry && matchResident;
  });

  const countryOptions = ['全部', '中国', '新加坡', '阿联酋', '泰国', '越南', '沙特阿拉伯', '马来西亚', '墨西哥', '英国'];
  const residentOptions = ['全部', '是', '否'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">国际合作中心合作机构</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <Input
          type="text"
          placeholder="搜索机构名称、关键词或分类..."
          className="w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {countryOptions.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select
          value={residentFilter}
          onChange={(e) => setResidentFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {residentOptions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPartners.map((partner, index) => (
          <Card key={index} className="rounded-2xl shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{partner.name}</h2>
              <p className="text-sm text-gray-600 mb-1">分类：{partner.category}</p>
              <p className="text-sm text-gray-600 mb-1">国家：{partner.country}</p>
              <p className="text-sm text-gray-600 mb-1">入驻机构：{partner.isResident ? '是' : '否'}</p>
              <p className="text-gray-700 text-sm mt-2">{partner.description}</p>
            </CardContent>
          </Card>
        ))}

        {filteredPartners.length === 0 && (
          <p className="text-center col-span-full text-gray-500">未找到相关合作机构</p>
        )}
      </div>
    </div>
  );
}
