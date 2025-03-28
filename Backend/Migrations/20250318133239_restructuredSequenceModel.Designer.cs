﻿// <auto-generated />
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250318133239_restructuredSequenceModel")]
    partial class restructuredSequenceModel
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Backend.Data.Models.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("GameId")
                        .HasColumnType("integer");

                    b.Property<int>("Points")
                        .HasColumnType("integer");

                    b.Property<int>("QuestionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("Backend.Data.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PlayerId")
                        .HasColumnType("integer");

                    b.Property<int>("SequenceId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PlayerId");

                    b.HasIndex("SequenceId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("Backend.Data.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("Backend.Data.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CorrectAnswer")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Hint")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Hint2")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("Backend.Data.Models.Sequence", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Sequences");
                });

            modelBuilder.Entity("Backend.Data.Models.SequenceQuestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<int>("QuestionId")
                        .HasColumnType("integer");

                    b.Property<int>("SequenceId")
                        .HasColumnType("integer");

                    b.Property<int>("SequencePart")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.HasIndex("SequenceId");

                    b.ToTable("SequenceQuestions");
                });

            modelBuilder.Entity("Backend.Data.Models.Answer", b =>
                {
                    b.HasOne("Backend.Data.Models.Game", null)
                        .WithMany("Answers")
                        .HasForeignKey("GameId");

                    b.HasOne("Backend.Data.Models.Question", "question")
                        .WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("question");
                });

            modelBuilder.Entity("Backend.Data.Models.Game", b =>
                {
                    b.HasOne("Backend.Data.Models.Player", "Player")
                        .WithMany("Games")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Data.Models.Sequence", "Sequence")
                        .WithMany("Games")
                        .HasForeignKey("SequenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Player");

                    b.Navigation("Sequence");
                });

            modelBuilder.Entity("Backend.Data.Models.SequenceQuestion", b =>
                {
                    b.HasOne("Backend.Data.Models.Question", "Question")
                        .WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Data.Models.Sequence", null)
                        .WithMany("Questions")
                        .HasForeignKey("SequenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("Backend.Data.Models.Game", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("Backend.Data.Models.Player", b =>
                {
                    b.Navigation("Games");
                });

            modelBuilder.Entity("Backend.Data.Models.Sequence", b =>
                {
                    b.Navigation("Games");

                    b.Navigation("Questions");
                });
#pragma warning restore 612, 618
        }
    }
}
