'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AddListing() {
  const [userId, setUserId] = useState<string | null>(null)
  const [franchise, setFranchise] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [investmentStart, setInvestmentStart] = useState('')
  const [investmentEnd, setInvestmentEnd] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        alert('Gagal mendeteksi user. Silakan login ulang.')
      } else {
        setUserId(data.user.id)
      }
    }
    getUser()
  }, [])

  const handleUpload = async () => {
    if (!logoFile) return null
    setUploading(true)

    const fileName = `${Date.now()}_${logoFile.name}`
    const { data, error } = await supabase.storage
      .from('listing-media')
      .upload(fileName, logoFile)

    setUploading(false)
    return error ? null : data?.path
  }

  const handleSubmit = async () => {
    if (!userId) return alert('User belum login.')

    const logoPath = await handleUpload()

    const { error } = await supabase.from('franchise_listings').insert({
      user_id: userId,
      franchise_listing: franchise,
      description,
      category,
      location,
      investment_start: parseInt(investmentStart),
      investment_end: parseInt(investmentEnd),
      logo: logoPath ?? '',
      is_paid: false,
      is_verified: false,
      is_active: true,
      view_count: 0,
      total_investment: 0,
      created_at: new Date().toISOString(),
    })

    if (error) {
      alert('Gagal menambahkan data.')
    } else {
      alert('Data berhasil ditambahkan!')
    }
  }

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Tambah Listing Franchise</h1>
      <input
        type="text"
        placeholder="Nama Franchise"
        className="border px-3 py-1 rounded w-full"
        value={franchise}
        onChange={(e) => setFranchise(e.target.value)}
      />
      <input
        type="text"
        placeholder="Deskripsi"
        className="border px-3 py-1 rounded w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kategori"
        className="border px-3 py-1 rounded w-full"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lokasi"
        className="border px-3 py-1 rounded w-full"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Minimal Investasi"
        className="border px-3 py-1 rounded w-full"
        value={investmentStart}
        onChange={(e) => setInvestmentStart(e.target.value)}
      />
      <input
        type="number"
        placeholder="Maksimal Investasi"
        className="border px-3 py-1 rounded w-full"
        value={investmentEnd}
        onChange={(e) => setInvestmentEnd(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setLogoFile(e.target.files[0])
          }
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {uploading ? 'Mengupload...' : 'Simpan Listing'}
      </button>
    </main>
  )
}
